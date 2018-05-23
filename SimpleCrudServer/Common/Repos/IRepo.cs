using Common.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Repos
{
    public interface IRepo
    {
        BaseUser GetUser(int id);

        IEnumerable<BaseUser> GetUsers();
    }
}
