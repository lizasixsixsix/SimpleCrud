using System;
using System.Collections.Generic;
using System.Text;
using Common.Entities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace MongoRepo.MongoEntities
{
    public class MongoUser : IUser
    {
        public MongoUser()
        {
        }

        public MongoUser(IUser user)
        {
            this.Id = user.Id;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.BirthYear = user.BirthYear;
            this.Country = user.Country;
            this.City = user.City;
        }

        public MongoUser(IUser user, int id) : this(user)
        {
            this.Id = id;
        }

        [BsonId]
        public ObjectId MongoId { get; set; }

        [BsonElement("userId")]
        public int Id { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("birthYear")]
        public string BirthYear { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }

        [BsonElement("city")]
        public string City { get; set; }

        [BsonElement("endDate")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime? EndDate { get; set; }
    }
}
