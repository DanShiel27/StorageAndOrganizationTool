using StorageAndOrganizationTool.Models.Domain;
using StorageAndOrganizationTool.Models.DTO;

namespace StorageAndOrganizationTool.Services.Mappers
{
    public static class PartMapping
    {

        public static PartDTO MapToDto(this Part entity)
        {
            return new PartDTO
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Length = entity.Length,
                Width = entity.Width,
                Height = entity.Height,
                ManufacturerId = entity.ManufacturerId,
                RebrickableId = entity.RebrickableId,
                BricklinkId = entity.BricklinkId,
                RoomId = entity.RoomId,
                RoomName = entity.Room?.Name
            };
        }

        public static Part MapToDomain(this PartDTO entity)
        {
            return new Part
            {
                Id = entity.Id,
                Name = entity.Name,
                Description = entity.Description,
                Length = entity.Length,
                Width = entity.Width,
                Height = entity.Height,
                ManufacturerId = entity.ManufacturerId,
                RebrickableId = entity.RebrickableId,
                BricklinkId = entity.BricklinkId,
                RoomId = entity.RoomId,
                //TODO figure out a better way to set the navigation property
            };
        }
    }
}
