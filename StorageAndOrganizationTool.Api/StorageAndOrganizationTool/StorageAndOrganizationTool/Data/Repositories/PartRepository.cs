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
            var result = await _context.Parts.AddAsync(part);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<bool> EditPart(int id, Part part)
        {
            var partToUpdate = await _context.Parts.FindAsync(id);

            if (partToUpdate is null) { return false; }

            partToUpdate.Id = part.Id;
            partToUpdate.Name = part.Name;
            partToUpdate.Description = part.Description;
            partToUpdate.Height = part.Height;
            partToUpdate.Width = part.Width;
            partToUpdate.Length = part.Length;
            partToUpdate.ManufacturerId = part.ManufacturerId;
            partToUpdate.BricklinkId = part.BricklinkId;
            partToUpdate.RebrickableId = part.RebrickableId;

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
