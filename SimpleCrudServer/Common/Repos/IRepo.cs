using Common.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.Repos
{
    public interface IRepo
    {
        Task<BaseUser> GetUserAsync(int id);

        Task<IEnumerable<BaseUser>> GetUsersAsync();

        Task AddUserAsync(BaseUser user);

        Task DeleteUserAsync(int id);

        Task UpdateUserAsync(int id, BaseUser user);
    }
}
