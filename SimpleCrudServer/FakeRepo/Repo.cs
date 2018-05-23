using Common.Entities;
using Common.Repos;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;
using System.IO;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;

namespace FakeRepo
{
    public class Repo : IRepo
    {
        private readonly string dataFile;

        public Repo(string dataFile)
        {
            this.dataFile = dataFile;
        }

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

        public async Task AddUserAsync(BaseUser user)
        {
            JObject o;

            JArray users;

            JObject u;

            using (StreamReader reader = File.OpenText(dataFile))
            {
                o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                users = (JArray)o["users"];

                user.Id = DateTime.Now.ToString("fffffff");

                u = JObject.FromObject(user);
            }

            using (StreamWriter writer = File.CreateText(dataFile))
            {
                await Task.Run(() => users.Add(u));

                o.WriteTo(new JsonTextWriter(writer) {
                    Formatting = Formatting.Indented,
                    Indentation = 2,
                    IndentChar = ' '
                });
            }
        }
    }
}
