using Common.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.Repos
{
    public interface IRepo
    {
        BaseUser GetUser(int id);

        IEnumerable<BaseUser> GetUsers();

        Task AddUserAsync(BaseUser user);
    }
}
