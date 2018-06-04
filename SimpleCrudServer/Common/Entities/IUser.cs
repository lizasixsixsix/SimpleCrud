using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Entities
{
    public interface IUser
    {
        int Id { get; set; }

        string FirstName { get; set; }

        string LastName { get; set; }

        string BirthYear { get; set; }

        string Country { get; set; }

        string City { get; set; }
    }
}
