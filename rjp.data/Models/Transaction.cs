using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rjp.data.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public int AccountId { get; set; }
        public Account? Account { get; set; }
    }
}
