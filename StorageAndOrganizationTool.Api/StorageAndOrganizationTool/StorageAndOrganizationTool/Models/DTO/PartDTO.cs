using StorageAndOrganizationTool.Models.Domain;

namespace StorageAndOrganizationTool.Models.DTO
{
    public class PartDTO : SnotBase
    {
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int ManufacturerId { get; set; }
        public int RebrickableId { get; set; }
        public int BricklinkId { get; set; }
    }
}
