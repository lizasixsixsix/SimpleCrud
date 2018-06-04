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

        public async Task<bool> UserExistsAsync(int id)
        {
            return await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        return o["users"]
                            .Any(u => u["id"].Value<int>() == id);
                    }
                }
            });
        }

        public async Task<IUser> GetUserAsync(int id)
        {
            return await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        return o["users"]
                            .Single(u => u["id"].Value<int>() == id)
                            .ToObject<FakeUser>();
                    }
                }
            });
        }

        public async Task<IEnumerable<IUser>> GetUsersAsync()
        {
            return await Task.Run(() =>
            {
                lock (fileAccess)
                {
                    using (StreamReader reader = File.OpenText(dataFile))
                    {
                        JObject o = (JObject)JToken.ReadFrom(new JsonTextReader(reader));

                        return o["users"].Select(u => u.ToObject<FakeUser>());
                    }
                }
            });
        }

        public async Task AddUserAsync(IUser user)
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

                        user.Id = Int32.Parse(DateTime.Now.ToString("fffffff"));

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
                            .Single(u => u["id"].Value<int>() == id)
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

        public async Task UpdateUserAsync(int id, IUser user)
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
                    }

                    using (StreamWriter writer = File.CreateText(dataFile))
                    {
                        users
                            .Single(uu => uu["id"].Value<int>() == id)
                            .Remove();

                        user.Id = id;

                        u = JObject.FromObject(user);

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
    }
}
