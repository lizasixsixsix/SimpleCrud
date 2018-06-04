using Common.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using MongoRepo.MongoEntities;

namespace MongoRepo
{
    public class MongoContext
    {
        private static IConfiguration Configuration { get; set; }

        public IMongoCollection<MongoUser> Users { get; set; }

        public MongoContext()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("dbsettings.real.json");

            MongoContext.Configuration = builder.Build();

            MongoClient client = new MongoClient(Configuration["db:connstr"]);

            IMongoDatabase database = client.GetDatabase(Configuration["db:database"]);

            var collName = Configuration["collections:users:name"];

            this.Users = database.GetCollection<MongoUser>(collName);
        }
    }
}
