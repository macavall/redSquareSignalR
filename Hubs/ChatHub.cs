using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task UpdateSquarePosition(int newX, int newY)
        {
            await Clients.All.SendAsync("UpdateSquarePosition", newX, newY);
        }
    }
}