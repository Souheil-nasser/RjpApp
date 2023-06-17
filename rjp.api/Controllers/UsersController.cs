using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rjp.data.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Threading.Tasks;

namespace rjp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true,
                PropertyNamingPolicy = null
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
          
            return Ok(user);

        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                WriteIndented = true,
                PropertyNamingPolicy = null
        };

            var users = await _context.Users
                .Include(u => u.Accounts)
                    .ThenInclude(a => a.Transactions)
                .ToListAsync();

            string json = JsonSerializer.Serialize(users, options);

            return Ok(json);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Accounts)
                    .ThenInclude(a => a.Transactions)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            var userInformation = new
            {
                Name = user.Name,
                Surname = user.Surname,
                Accounts = user.Accounts.Select(a => new
                {
                    Balance = a.Balance,
                    Transactions = a.Transactions.Select(t => new
                    {
                        Amount = t.Amount,
                        TransactionDate = t.TransactionDate
                    }).ToList()
                }).ToList()
            };

            return Ok(userInformation);
        }
    }
}
