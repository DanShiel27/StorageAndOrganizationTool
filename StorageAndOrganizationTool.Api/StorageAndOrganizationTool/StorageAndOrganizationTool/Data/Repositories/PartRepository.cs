using Microsoft.EntityFrameworkCore;
using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Data.Repositories
{
    public class PartRepository : IPartRepository
    {
        private readonly InMemoryDbContext _context;
        public PartRepository(InMemoryDbContext dbContext) 
        {
            this._context = dbContext;
        }

        public async Task<IEnumerable<Part>> GetParts()
        {
            var Parts = await _context.Parts
                .Include(part => part.Room)
                .ToListAsync();
            return Parts;
        }

        public async Task<Part?> AddPart(Part part) 
        {
            //if part should have a room, make sure it exists
            if (part.RoomId is not null)
            {
                var room = await _context.Rooms.FindAsync(part.RoomId);

                if (room is null) { return null; }//trying to assign to a room that doesn't exist
                part.Room = room;
            }

            var result = await _context.Parts.AddAsync(part);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<bool> EditPart(int id, Part incomingPart)
        {
            //make sure part exists
            var partToUpdate = await _context.Parts
                .Include(part => part.Room)
                .FirstOrDefaultAsync(part => part.Id == id);

            if (partToUpdate is null) { return false; }

            Room? possibleRoom = null;

            //if part is trying to have room, make sure it exists
            if(incomingPart.RoomId is not null)
            {
                //are we changing rooms?
                if (incomingPart.RoomId != partToUpdate.RoomId)
                {
                    possibleRoom = await _context.Rooms.FindAsync(incomingPart.RoomId);

                    if (possibleRoom is null) { return false; }
                }
                else
                {
                    possibleRoom = partToUpdate.Room;
                }
            }
            
            partToUpdate.Id = incomingPart.Id;
            partToUpdate.Name = incomingPart.Name;
            partToUpdate.Description = incomingPart.Description;
            partToUpdate.Height = incomingPart.Height;
            partToUpdate.Width = incomingPart.Width;
            partToUpdate.Length = incomingPart.Length;
            partToUpdate.ManufacturerId = incomingPart.ManufacturerId;
            partToUpdate.BricklinkId = incomingPart.BricklinkId;
            partToUpdate.RebrickableId = incomingPart.RebrickableId;

            partToUpdate.RoomId = incomingPart.RoomId;
            partToUpdate.Room = possibleRoom;

            var result = await _context.SaveChangesAsync();

            return result == 1;
        }

        public async Task<Boolean> DeletePart(int partId)
        {
            var part = await _context.Parts.FindAsync(partId);
            if (part != null) 
            {
                _context.Parts.Remove(part);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
