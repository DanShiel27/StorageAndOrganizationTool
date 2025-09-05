using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Data.Repositories
{
    public interface IRoomRepository
    {
        Task<IEnumerable<Room>> GetRooms();

        Task<Room?> GetRoom(int id);

        Task<Room?> AddPart(Room room);

        Task<bool> EditRoom(int id, Room room);
    }
}
