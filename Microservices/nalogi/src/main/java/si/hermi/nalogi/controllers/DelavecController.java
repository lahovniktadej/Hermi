package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelavecDto;
import si.hermi.nalogi.repositories.DelavecRepository;
import si.hermi.nalogi.vao.Delavec;

import java.util.Optional;

@RestController
@RequestMapping("/delavec")
public class DelavecController {
    @Autowired
    private DelavecRepository delavecRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public @ResponseBody Iterable<Delavec> all() {
        return delavecRepository.findAll();
    }

    @GetMapping(params = {"page", "perPage"})
    public Iterable<Delavec> getPage(@RequestParam int page, @RequestParam int perPage) {
        return delavecRepository.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getDelavec(@PathVariable int id) {
        Optional<Delavec> delavecOpt = delavecRepository.findById(id);
        if (delavecOpt.isPresent()) {
            DelavecDto delavecDto = modelMapper.map(delavecOpt.get(), DelavecDto.class);
            return ResponseEntity.ok(delavecDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addDelavec(@RequestBody DelavecDto delavecDto) {
        Delavec delavec = modelMapper.map(delavecDto, Delavec.class);
        delavecRepository.save(delavec);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateDelavec(@PathVariable int id, @RequestBody DelavecDto delavecDto) {
        Optional<Delavec> delavecOpt = delavecRepository.findById(id);
        if (delavecOpt.isPresent()) {
            Delavec delavec = delavecOpt.get();
            modelMapper.map(delavecDto, delavec);
            delavecRepository.save(delavec);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteDelavec(@PathVariable int id) {
        delavecRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
