import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  baseUrl: string;
  length: number;
  currentPage: number;
  totalPages: number;
}

export const PaginationList: React.FC<Props> = ({
  baseUrl,
  currentPage,
  totalPages,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${
              currentPage > 1
                ? "hover:bg-hoverLink hover:text-white"
                : "opacity-50 cursor-default pointer-events-none select-none"
            }`}
            to={`${baseUrl}?page=${currentPage > 1 ? currentPage - 1 : 0}`}
          />
        </PaginationItem>

        {totalPages < 7 ? (
          Array.from({ length: totalPages }).map((_page, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className={`${
                  currentPage == index + 1
                    ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                    : "hover:bg-hoverLink hover:text-white"
                }`}
                to={`${baseUrl}?page=${index + 1}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            {currentPage > 3 && currentPage <= totalPages - 3 ? (
              <>
                {Array.from({ length: 2 }).map((_page, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`${
                        currentPage == index + 1
                          ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                          : "hover:bg-hoverLink hover:text-white"
                      }`}
                      to={`${baseUrl}?page=${index + 1}`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {Array.from({ length: 3 }).map((_page, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`${
                        currentPage == index + currentPage - 1
                          ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                          : "hover:bg-hoverLink hover:text-white"
                      }`}
                      to={`${baseUrl}?page=${currentPage + index - 1}`}
                    >
                      {currentPage + index - 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {[1, 0].map((_page) => (
                  <PaginationItem key={totalPages - _page}>
                    <PaginationLink
                      className={`${
                        currentPage == totalPages - _page
                          ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                          : "hover:bg-hoverLink hover:text-white"
                      }`}
                      to={`${baseUrl}?page=${totalPages - _page}`}
                    >
                      {totalPages - _page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              <>
                {Array.from({ length: 3 }).map((_page, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`${
                        currentPage == index + 1
                          ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                          : "hover:bg-hoverLink hover:text-white"
                      }`}
                      to={`${baseUrl}?page=${index + 1}`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {[2, 1, 0].map((_page) => (
                  <PaginationItem key={totalPages - _page}>
                    <PaginationLink
                      className={`${
                        currentPage == totalPages - _page
                          ? "bg-color2 hover:bg-color2 hover:text-white hover:opacity-50 text-white"
                          : "hover:bg-hoverLink hover:text-white"
                      }`}
                      to={`${baseUrl}?page=${totalPages - _page}`}
                    >
                      {totalPages - _page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            )}
          </>
        )}

        <PaginationItem>
          <PaginationNext
            className={`${
              currentPage < totalPages
                ? "hover:bg-hoverLink hover:text-white"
                : "opacity-50 cursor-default pointer-events-none select-none"
            }`}
            to={`${baseUrl}?page=${
              currentPage < totalPages ? currentPage + 1 : totalPages
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
