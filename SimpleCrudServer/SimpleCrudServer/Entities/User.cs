using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleCrudServer.Entities
{
    public class User
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("birthYear")]
        public string BirthYear { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }
    }
}
