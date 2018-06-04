using Common.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace FakeRepo
{
    public class FakeUser : IUser
    {
        [JsonProperty("id")]
        public int Id { get; set; }

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
