using Common.Entities;
using Common.Repos;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;
using System.Linq;

namespace FakeRepo
{
    public class Repo : IRepo
    {
        private readonly string dataFile = @"Data\FakeData.json";

        public BaseUser GetUser(int id)
        {
            using (StreamReader reader = File.OpenText(dataFile))
            {
                JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                return o["users"].Select(u => u.ToObject<BaseUser>()).Single(uu => Int32.Parse(uu.Id) == id);
            }
        }

        public IEnumerable<BaseUser> GetUsers()
        {
            using (StreamReader reader = File.OpenText(dataFile))
            {
                JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                return o["users"].Select(u => u.ToObject<BaseUser>());
            }
        }
    }
}
