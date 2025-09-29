using Microsoft.EntityFrameworkCore;
using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Data.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly InMemoryDbContext _context;
        public RoomRepository(InMemoryDbContext context)
        {
            _context = context;
        }

        public async Task<Room?> AddRoom(Room room)
        {
            var result = _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<bool> EditRoom(int id, Room room)
        {
            var roomToUpdate = await _context.Rooms.FindAsync(id);

            if (roomToUpdate is null) { return false; }

            //can't updated id 
            roomToUpdate.Name = room.Name;
            roomToUpdate.Description = room.Description;
            roomToUpdate.PictureNumber = room.PictureNumber;

            var result = await _context.SaveChangesAsync();

            return result == 1;
        }

        public async Task<Room?> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            return room;
        }

        public async Task<IEnumerable<Room>> GetRooms()
        {
            var Roomlist = await _context.Rooms.ToListAsync();
            return Roomlist;
        }
    }
}
