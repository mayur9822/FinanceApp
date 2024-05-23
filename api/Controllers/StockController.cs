using api.Data;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Microsoft.AspNetCore.Mvc.Route("api/Stock")]
    [ApiController]

    public class StockController: ControllerBase
    {

        private readonly ApplicationDBContext _context ;
        public StockController(ApplicationDBContext context)
        {
          _context=context;
        }
        [HttpGet]
        public IActionResult GetALL()
        {
            var stocks= _context.Stock.ToList();
            return Ok(stocks);
        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id) 
        {
            var stock=_context.Stock.Find(id);

            if(stock==null)
            {
                return NotFound();
            }
            return Ok(stock);
        }
        
    }
}