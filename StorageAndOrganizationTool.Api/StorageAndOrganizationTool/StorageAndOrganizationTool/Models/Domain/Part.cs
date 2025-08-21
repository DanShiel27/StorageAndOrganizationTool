namespace StorageAndOrganizationTool.Models.Domain
{
    public class Part : SnotBase
    {
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int ManufacturerId { get; set; }
        public int RebrickableId { get; set; }
        public int BricklinkId { get; set; }
    }
}
