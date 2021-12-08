package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.VoziloDto;
import si.hermi.nalogi.repositories.VoziloRepository;
import si.hermi.nalogi.vao.Vozilo;

import java.util.Optional;

@RestController
@RequestMapping("/vozilo")
public class VoziloController {
    @Autowired
    private VoziloRepository voziloRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public @ResponseBody Iterable<Vozilo> all() {
        return voziloRepository.findAll();
    }
    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getVozilo(@PathVariable int id) {
        Optional<Vozilo> vozilaOpt = voziloRepository.findById(id);
        if (vozilaOpt.isPresent()) {
            VoziloDto voziloDto = modelMapper.map(vozilaOpt.get(), VoziloDto.class);
            return ResponseEntity.ok(voziloDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping() public @ResponseBody ResponseEntity addVozilo(@RequestBody VoziloDto voziloDto) {
        Vozilo vozilo = modelMapper.map(voziloDto, Vozilo.class);
        voziloRepository.save(vozilo);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateVozilo(@PathVariable int id, @RequestBody VoziloDto voziloDto) {
        Optional<Vozilo> voziloOpt = voziloRepository.findById(id);
        if (voziloOpt.isPresent()) {
            Vozilo vozilo = voziloOpt.get();
            modelMapper.map(voziloDto, vozilo);
            voziloRepository.save(vozilo);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteVozilo(@PathVariable int id) {
        voziloRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
