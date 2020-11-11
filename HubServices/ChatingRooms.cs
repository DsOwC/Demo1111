using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChating.HubServices
{
    public class ChatingRooms : Hub
    {
        public async Task SendMessage(string name, string msg)
        {
            await Clients.All.SendAsync("ReceiveMsg", name, msg);
        }
    }
}
