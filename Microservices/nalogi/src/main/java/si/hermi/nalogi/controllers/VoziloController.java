package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.VoziloDto;
import si.hermi.nalogi.services.VoziloService;
import si.hermi.nalogi.vao.Vozilo;

import java.util.Optional;

@RestController
@RequestMapping("/vozilo")
public class VoziloController {
    @Autowired
    private VoziloService voziloService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public @ResponseBody Iterable<Vozilo> all() {
        return voziloService.findAll();
    }

    @GetMapping(params = {"page", "perPage"})
    public Iterable<Vozilo> getPage(@RequestParam int page, @RequestParam int perPage) {
        return voziloService.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getVozilo(@PathVariable int id) {
        Optional<Vozilo> vozilaOpt = voziloService.findById(id);
        if (vozilaOpt.isPresent()) {
            VoziloDto voziloDto = modelMapper.map(vozilaOpt.get(), VoziloDto.class);
            return ResponseEntity.ok(voziloDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping() public @ResponseBody ResponseEntity addVozilo(@RequestBody VoziloDto voziloDto) {
        Vozilo vozilo = modelMapper.map(voziloDto, Vozilo.class);
        voziloService.save(vozilo);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateVozilo(@PathVariable int id, @RequestBody VoziloDto voziloDto) {
        Optional<Vozilo> voziloOpt = voziloService.findById(id);
        if (voziloOpt.isPresent()) {
            Vozilo vozilo = voziloOpt.get();
            modelMapper.map(voziloDto, vozilo);
            voziloService.save(vozilo);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteVozilo(@PathVariable int id) {
        voziloService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
