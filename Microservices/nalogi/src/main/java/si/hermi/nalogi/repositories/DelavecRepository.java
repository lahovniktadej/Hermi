package si.hermi.nalogi.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import si.hermi.nalogi.vao.Delavec;

public interface DelavecRepository extends PagingAndSortingRepository<Delavec, Integer> {
}
