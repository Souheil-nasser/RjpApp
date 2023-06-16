using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rjp.data.Models;

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
        public async Task<ActionResult<Account>> OpenAccount(int customerId, float initialCredit)
        {
            var user = await _context.Users.FindAsync(customerId);
            if (user == null)
            {
                return NotFound();
            }
            var account = new Account
            {
                UserId = customerId,
                Balance = initialCredit,
                AccountNumber = $"{user.Name}{user.Id} {DateTime.UtcNow.ToString("yyyyMMddHHmmss")}"
                //using timestamps to make the account number unique
            };
            _context.Accounts.Add(account);
            if (initialCredit != 0)
            {
                var transaction = new Transaction
                {
                    Account = account,
                    Amount = initialCredit,
                    TransactionDate = DateTime.UtcNow
                };
                _context.Transactions.Add(transaction);
            }
            await _context.SaveChangesAsync();

            return Ok("Account created successfully for " + user.Name + " account  : " + account.AccountNumber );
        }
    }
}
