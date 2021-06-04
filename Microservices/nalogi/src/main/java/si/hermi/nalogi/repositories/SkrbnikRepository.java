package si.hermi.nalogi.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import si.hermi.nalogi.vao.Skrbnik;

public interface SkrbnikRepository extends PagingAndSortingRepository<Skrbnik, Integer> {
}
