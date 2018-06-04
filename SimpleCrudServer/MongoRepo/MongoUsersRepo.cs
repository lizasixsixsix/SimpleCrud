using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Common.Entities;
using Common.Repos;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoRepo.MongoEntities;
using Newtonsoft.Json;

namespace MongoRepo
{
    public class MongoUsersRepo : IRepo
    {
        private readonly IMongoCollection<MongoUser> _users;

        public MongoUsersRepo(MongoContext context)
        {
            this._users = context.Users;
        }

        public async Task<bool> UserExistsAsync(int id)
        {
            return await
                (await _users.FindAsync(
                    $"{{ $and: [ {{ userId: {id} }}, {{ endDate: null }} ] }}"))
                .AnyAsync();
        }

        public async Task AddUserAsync(IUser user)
        {
            await _users.InsertOneAsync(
                new MongoUser(user, Int32.Parse(DateTime.Now.ToString("fffffff"))));
        }

        public async Task<IUser> GetUserAsync(int id)
        {
            return await
                (await _users.FindAsync(
                    $"{{ $and: [ {{ userId: {id} }}, {{ endDate: null }} ] }}"))
                .FirstOrDefaultAsync() ?? new MongoUser();
        }

        public async Task<IEnumerable<IUser>> GetUsersAsync()
        {
            return (await _users.FindAsync("{ endDate: null }"))
                       .ToEnumerable();
        }

        public async Task UpdateUserAsync(int id, IUser user)
        {
            if (id != user.Id) return;

            // await _users.UpdateOneAsync(
            await _users.UpdateManyAsync(
                $"{{ $and: [ {{ userId: {id} }}, {{ endDate: null }} ] }}",
                $"{{ $set: {{ endDate: ISODate(\"{new BsonDateTime(DateTime.UtcNow)}\") }} }}");

            await _users.InsertOneAsync(new MongoUser(user));
        }

        public async Task DeleteUserAsync(int id)
        {
            // await _users.UpdateOneAsync(
            await _users.UpdateManyAsync(
                $"{{ $and: [ {{ userId: {id} }}, {{ endDate: null }} ] }}",
                $"{{ $set: {{ endDate: ISODate(\"{new BsonDateTime(DateTime.UtcNow)}\") }} }}");
        }
    }
}
