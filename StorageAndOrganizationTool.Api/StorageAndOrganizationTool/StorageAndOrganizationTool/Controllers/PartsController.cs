using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StorageAndOrganizationTool.Data.Repositories;
using StorageAndOrganizationTool.Models.Domain;
using StorageAndOrganizationTool.Models.DTO;
using StorageAndOrganizationTool.Services.Mappers;

namespace StorageAndOrganizationTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController(IPartRepository partsRepository) : ControllerBase
    {
        private readonly IPartRepository _partsRepository = partsRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllPartsAsync()
        {
            var parts = await _partsRepository.GetParts();
            var partDtos = parts
                .Select(Part => Part.MapToPartDto())
                .ToList();

            return Ok(partDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddPart(PartDTO partDto)
        {
            var insertedPart = await _partsRepository.AddPart(partDto.MapToPart());
            var insertedDto = insertedPart.MapToPartDto();
            return Ok(insertedDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPart(int id, PartDTO partDto)
        {
            if(partDto.Id <= 0 || id <= 0)
            {
                return BadRequest();
            }
            var isSuccess = await _partsRepository.EditPart(id, partDto.MapToPart());

            if (isSuccess) 
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{partId}")]
        public async Task<IActionResult> DeletePart(int partId)
        {
            var isDeleted = await _partsRepository.DeletePart(partId);
            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}
