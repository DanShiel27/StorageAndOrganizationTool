using StorageAndOrganizationTool.Models.Domain;
using StorageAndOrganizationTool.Models.DTO;

namespace StorageAndOrganizationTool.Services.Mappers
{
    public static class RoomMapping
    {
        public static RoomDTO MapToDto(this Room entity)
        {
            return new RoomDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                PictureNumber = entity.PictureNumber
            };
        }

        public static Room MapToDomain(this RoomDTO entity) 
        {
            return new Room
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                PictureNumber = entity.PictureNumber
            };
        }
    }
}
