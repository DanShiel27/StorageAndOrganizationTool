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
            var Parts = await _context.Parts.ToListAsync();
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

        public async Task<bool> EditPart(int id, Part part)
        {
            //make sure part exists
            var partToUpdate = await _context.Parts.FindAsync(id);

            if (partToUpdate is null) { return false; }

            Room? possibleRoom = null;

            //if part has a room, make sure it exists
            if(part.RoomId is not null)
            {
                possibleRoom = await _context.Rooms.FindAsync(part.RoomId);

                if (possibleRoom is null) { return false; }//trying to assign to a room that doesn't exist
            }
            
            partToUpdate.Id = part.Id;
            partToUpdate.Name = part.Name;
            partToUpdate.Description = part.Description;
            partToUpdate.Height = part.Height;
            partToUpdate.Width = part.Width;
            partToUpdate.Length = part.Length;
            partToUpdate.ManufacturerId = part.ManufacturerId;
            partToUpdate.BricklinkId = part.BricklinkId;
            partToUpdate.RebrickableId = part.RebrickableId;

            partToUpdate.RoomId = part.RoomId;
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
