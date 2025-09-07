using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StorageAndOrganizationTool.Data.Repositories;
using StorageAndOrganizationTool.Models.DTO;
using StorageAndOrganizationTool.Services.Mappers;

namespace StorageAndOrganizationTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController(IRoomRepository roomRepository) : ControllerBase
    {
        private readonly IRoomRepository _roomRepository = roomRepository;

        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomRepository.GetRooms();
            var roomList = rooms
                .Select(room => room.MapToDto())
                .ToList();
            return Ok(roomList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _roomRepository.GetRoom(id);
            if(room is not null)
            {
                var roomDto = room.MapToDto();
                return Ok(roomDto);
            }
            return BadRequest();//couldn't find specific room
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(RoomDTO roomDto)
        {
            var insertedRoom = await _roomRepository.AddRoom(roomDto.MapToDomain());
            if (insertedRoom is not null) 
            {
                var insertedDto = insertedRoom.MapToDto();
                return Ok(insertedDto);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRoom(int id, RoomDTO roomDto)
        {
            if(roomDto.Id != id || roomDto.Id <= 0 || id <= 0)
            {
                return BadRequest();
            }
            var isSuccess = await _roomRepository.EditRoom(id, roomDto.MapToDomain());
            if (isSuccess) 
            {
                return NoContent();
            }
            return BadRequest();
        }
    }
}
