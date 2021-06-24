package si.hermi.nalogi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import si.hermi.nalogi.dto.DelovniNalogDto;
import si.hermi.nalogi.services.DelovniNalogService;
import si.hermi.nalogi.vao.DelovniNalog;

import java.util.Optional;

@RestController
@RequestMapping("/delovniNalog")
public class DelovniNalogController {
    @Autowired
    private DelovniNalogService delovniNalogService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Iterable<DelovniNalog> getAll() {
        return delovniNalogService.findAll();
    }

    @GetMapping(params = {"page", "perPage"})
    public Iterable<DelovniNalog> getPage(@RequestParam int page, @RequestParam int perPage) {
        return delovniNalogService.findAll(PageRequest.of(page, perPage));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity getDelovniNalog(@PathVariable int id) {
        Optional<DelovniNalog> delovniNalogOpt = delovniNalogService.findById(id);
        if (delovniNalogOpt.isPresent()) {
            DelovniNalogDto delovniNalogDto = modelMapper.map(delovniNalogOpt.get(), DelovniNalogDto.class);
            return ResponseEntity.ok(delovniNalogDto);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping()
    public @ResponseBody ResponseEntity addDelovniNalog(@RequestBody DelovniNalogDto delovniNalogDto) {
        DelovniNalog delovniNalog = modelMapper.map(delovniNalogDto, DelovniNalog.class);
        return ResponseEntity.ok(delovniNalogService.save(delovniNalog));
    }

    @PutMapping("/{id}")
    public @ResponseBody ResponseEntity updateDelovniNalog(@PathVariable int id, @RequestBody DelovniNalogDto delovniNalogDto) {
        Optional<DelovniNalog> delovniNalogOpt = delovniNalogService.findById(id);
        if (delovniNalogOpt.isPresent()) {
            DelovniNalog delovniNalog = delovniNalogOpt.get();
            modelMapper.map(delovniNalogDto, delovniNalog);
            return ResponseEntity.ok(delovniNalogService.save(delovniNalog));
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity deleteDelovniNalog(@PathVariable int id) {
        delovniNalogService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
