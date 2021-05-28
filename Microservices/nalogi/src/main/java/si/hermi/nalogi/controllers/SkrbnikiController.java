package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelavecDto;
import si.hermi.nalogi.dto.SkrbnikDto;
import si.hermi.nalogi.repositories.SkrbnikRepository;
import si.hermi.nalogi.vao.Skrbnik;

import java.util.Optional;

@RestController
@RequestMapping("/skrbnik")
public class SkrbnikiController {
    @Autowired
    private SkrbnikRepository skrbnikRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public @ResponseBody
    Iterable<Skrbnik> all() {
        return skrbnikRepository.findAll();
    }
    @GetMapping("/{id}")
    public @ResponseBody
    ResponseEntity getSkrbnik(@PathVariable int id) {
        Optional<Skrbnik> skrbnikOpt = skrbnikRepository.findById(id);
        if (skrbnikOpt.isPresent()) {
            DelavecDto delavecDto = modelMapper.map(skrbnikOpt.get(), DelavecDto.class);
            return ResponseEntity.ok(delavecDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addSkrbnik(@RequestBody SkrbnikDto skrbnikDto) {
        Skrbnik skrbnik = modelMapper.map(skrbnikDto, Skrbnik.class);
        skrbnikRepository.save(skrbnik);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateSkrbnik(@PathVariable int id, @RequestBody SkrbnikDto skrbnikDto) {
        Optional<Skrbnik> skrbnikOpt = skrbnikRepository.findById(id);
        if (skrbnikOpt.isPresent()) {
            Skrbnik skrbnik = skrbnikOpt.get();
            modelMapper.map(skrbnikDto, skrbnik);
            skrbnikRepository.save(skrbnik);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteSkrbnik(@PathVariable int id) {
        skrbnikRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
