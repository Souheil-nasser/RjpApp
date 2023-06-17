using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rjp.data.Models;
using Microsoft.AspNetCore.Cors;
using System;
using System.Threading.Tasks;

namespace rjp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> OpenAccount(Account? acc)
        {
            if (acc == null)
            {
                return BadRequest("Invalid account data");
            }
            var user = await _context.Users.FindAsync(acc.UserId);
            if (user == null)
            {
                return NotFound();
            }

            var account = new Account
            {
                UserId = acc.UserId,
                Balance = acc.Balance,
                AccountNumber = $"{user.Name}{user.Id} {DateTime.UtcNow.ToString("yyyyMMddHHmmss")}"
                //using timestamps to make the account number unique
            };

            _context.Accounts.Add(account);

            if (acc.Balance != 0)
            {
                var transaction = new Transaction
                {
                    Account = account,
                    Amount = acc.Balance,
                    TransactionDate = DateTime.UtcNow
                };

                _context.Transactions.Add(transaction);
            }

            await _context.SaveChangesAsync();
            return Ok();
            return Ok("Account created successfully for " + user.Name + " account: " + account.AccountNumber);
        }
    }
}
