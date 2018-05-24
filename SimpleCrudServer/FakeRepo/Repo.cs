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

        static readonly object fileAccess = new object();

        public Repo(string dataFile)
        {
            this.dataFile = dataFile;
        }

        public async Task<BaseUser> GetUserAsync(int id)
        {
            return await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        return o["users"]
                            .Single(u => Int32.Parse(u["id"].Value<string>()) == id)
                            .ToObject<BaseUser>();
                    }
                }
            });
        }

        public async Task<IEnumerable<BaseUser>> GetUsersAsync()
        {
            return await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        return o["users"].Select(u => u.ToObject<BaseUser>());
                    }
                }
            });
        }

        public async Task AddUserAsync(BaseUser user)
        {
            JObject o;

            JArray users;

            JObject u;

            await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        users = (JArray)o["users"];

                        user.Id = DateTime.Now.ToString("fffffff");

                        u = JObject.FromObject(user);
                    }

                    using (StreamWriter writer = File.CreateText(dataFile))
                    {
                        users.Add(u);

                        o.WriteTo(new JsonTextWriter(writer)
                        {
                            Formatting = Formatting.Indented,
                            Indentation = 2,
                            IndentChar = ' '
                        });
                    }
                }
            });
        }

        public async Task DeleteUserAsync(int id)
        {
            JObject o;

            JArray users;

            await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        users = (JArray)o["users"];
                    }

                    using (StreamWriter writer = File.CreateText(dataFile))
                    {
                        users
                            .Single(u => Int32.Parse(u["id"].Value<string>()) == id)
                            .Remove();

                        o.WriteTo(new JsonTextWriter(writer)
                        {
                            Formatting = Formatting.Indented,
                            Indentation = 2,
                            IndentChar = ' '
                        });
                    }
                }
            });
        }
    }
}
