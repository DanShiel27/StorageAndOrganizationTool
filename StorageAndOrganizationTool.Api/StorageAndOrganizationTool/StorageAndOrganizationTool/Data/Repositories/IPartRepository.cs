using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Data.Repositories
{
    public interface IPartRepository
    {
        Task<IEnumerable<Part>> GetParts();

        Task<Part?> AddPart(Part part);

        Task<bool> EditPart(int id, Part part);

        Task<Boolean> DeletePart(int partId);
    }
}
