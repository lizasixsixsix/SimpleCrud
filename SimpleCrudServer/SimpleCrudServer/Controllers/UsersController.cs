using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleCrudServer.Entities;

namespace SimpleCrudServer.Controllers
{
    [Route("api/Users")]
    public class UsersController : Controller
    {
        // GET api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return new [] { new User { Id = "1", FirstName = "Fake", LastName = "Fictitious", BirthYear = "1933", Country = "US", City = "San Francisco" } };
        }
    }
}