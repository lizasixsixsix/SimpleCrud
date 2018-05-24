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
        public async Task<IEnumerable<User>> Get()
        {
            return (await repo.GetUsersAsync()).Select(Mapper.Map<User>);
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            await repo.AddUserAsync(user);

            return Ok(user);
        }

        // DELETE api/users/1234567
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await repo.DeleteUserAsync(id);

            return Ok();
        }
    }
}