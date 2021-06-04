package si.hermi.nalogi.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import si.hermi.nalogi.vao.Vozilo;

public interface VoziloRepository extends PagingAndSortingRepository<Vozilo, Integer> {
}
