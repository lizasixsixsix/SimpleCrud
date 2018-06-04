using Common.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.Repos
{
    public interface IRepo
    {
        Task<bool> UserExistsAsync(int id);

        Task<IUser> GetUserAsync(int id);

        Task<IEnumerable<IUser>> GetUsersAsync();

        Task AddUserAsync(IUser user);

        Task DeleteUserAsync(int id);

        Task UpdateUserAsync(int id, IUser user);
    }
}
