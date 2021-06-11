package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.SkrbnikDto;
import si.hermi.nalogi.repositories.SkrbnikRepository;
import si.hermi.nalogi.vao.Skrbnik;

import java.util.Optional;

@RestController
@RequestMapping("/skrbnik")
public class SkrbnikController {
    @Autowired
    private SkrbnikRepository skrbnikRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()public @ResponseBody Iterable<Skrbnik> all() {
        return skrbnikRepository.findAll();
    }

    @GetMapping(params = {"page", "perPage"})
    public Iterable<Skrbnik> getPage(@RequestParam int page, @RequestParam int perPage) {
        return skrbnikRepository.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getSkrbnik(@PathVariable int id) {
        Optional<Skrbnik> skrbnikOpt = skrbnikRepository.findById(id);
        if (skrbnikOpt.isPresent()) {
            SkrbnikDto skrbnikDto = modelMapper.map(skrbnikOpt.get(), SkrbnikDto.class);
            return ResponseEntity.ok(skrbnikDto);
        }
        return ResponseEntity.badRequest().build();
    }
    @GetMapping("/username/{username}")
    public @ResponseBody ResponseEntity getSkrbnikByUsername(@PathVariable String username) {
        Skrbnik skrbnik = skrbnikRepository.findByUporabniskoIme(username);
        SkrbnikDto skrbnikDto = modelMapper.map(skrbnik, SkrbnikDto.class);
        return ResponseEntity.ok(skrbnikDto);
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
