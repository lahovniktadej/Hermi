package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelovniNalogDto;
import si.hermi.nalogi.repositories.DelovniNalogRepository;
import si.hermi.nalogi.vao.DelovniNalog;

import java.util.Optional;

@RestController
@RequestMapping("/delovniNalog")
public class DelovniNalogController {
    @Autowired
    DelovniNalogRepository delovniNalogRepository;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping()
    public Iterable<DelovniNalog> getAll() {
        return delovniNalogRepository.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getDelovniNalog(@PathVariable int id) {
        Optional<DelovniNalog> delovniNalogOpt = delovniNalogRepository.findById(id);
        if (delovniNalogOpt.isPresent()) {
            DelovniNalogDto delovniNalogDto = modelMapper.map(delovniNalogOpt.get(), DelovniNalogDto.class);
            return ResponseEntity.ok(delovniNalogDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addDelovniNalog(@RequestBody DelovniNalogDto delovniNalogDto) {
        DelovniNalog delovniNalog = modelMapper.map(delovniNalogDto, DelovniNalog.class);
        delovniNalogRepository.save(delovniNalog);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateDelovniNalog(@PathVariable int id, @RequestBody DelovniNalogDto delovniNalogDto) {
        Optional<DelovniNalog> delovniNalogOpt = delovniNalogRepository.findById(id);
        if (delovniNalogOpt.isPresent()) {
            DelovniNalog delovniNalog = modelMapper.map(delovniNalogDto, DelovniNalog.class);
            delovniNalogRepository.save(delovniNalog);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteDelovniNalog(@PathVariable int id) {
        delovniNalogRepository.deleteById(id);
        return ResponseEntity.badRequest().build();
    }
}
