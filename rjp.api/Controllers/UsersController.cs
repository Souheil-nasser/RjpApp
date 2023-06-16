using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rjp.data.Models;
using System.Collections.Generic;
using System.Linq;

namespace rjp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User created successfully  " + user.Name);
        }
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            //eager loading 
            var user = _context.Users
                .Include(u => u.Accounts)
                    .ThenInclude(a => a.Transactions)
                .FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            var userInformation = new
            {
                Name = user.Name,
                Surname = user.Surname,
                Accounts = user.Accounts.Select(a => new //to only retrieve the balance and transaction amount and date
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
