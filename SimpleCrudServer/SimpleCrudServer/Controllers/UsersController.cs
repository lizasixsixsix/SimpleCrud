using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Common.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleCrudServer.Entities;

namespace SimpleCrudServer.Controllers
{
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly IRepo repo;

        public UsersController(IRepo repo)
        {
            this.repo = repo;
        }

        // GET api/users
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return repo.GetUsers().Select(u => Mapper.Map<User>(u));
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            await repo.AddUserAsync(user);

            return Ok(user);
        }
    }
}