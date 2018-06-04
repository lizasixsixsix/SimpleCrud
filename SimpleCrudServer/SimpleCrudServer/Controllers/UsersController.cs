using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Common.Entities;
using Common.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleCrudServer.Entities;

namespace SimpleCrudServer.Controllers
{
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly IRepo _repo;

        private readonly IMapper _mapper;

        public UsersController(IRepo repo)
        {
            this._repo = repo;

            this._mapper = new MapperConfiguration(
                    cfg => cfg.CreateMap<IUser, User>())
                .CreateMapper();
        }

        // GET api/users
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return (await _repo.GetUsersAsync()).Select(_mapper.Map<User>);
        }

        // POST api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            await _repo.AddUserAsync(user);

            return Ok(user);
        }

        // DELETE api/users/1234567
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteUserAsync(id);

            return Ok();
        }

        // PUT api/users/1234567
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            await _repo.UpdateUserAsync(id, user);

            return Ok(user);
        }
    }
}