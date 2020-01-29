#include "mpi.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
    int i, myid, num = 4;
    float x, pi ,sum = 0, local;
    long n = 1000000;
    MPI Status status;
    MPI_Init(&argc, &argv);
    MPI_Comm_RANK(MPI_Comm_WORLD, &myid);
    for(i = 0 + myid;i < n;i = i + num)
    {
        x = 1 / n * (i + 0.5);
        sum += 4 / (1 + x * x) / n;
    }
    local = sum;
    if(myid != 0)
    {
        MPI_Send(&local, 1, MPI_FLOAT, 0, 1, MPI_Comm_WORLD);
    }
    else
    {
        pi = local;
        for(i = 1;i < 4;i++)
        {
            MPIRecv(&local, 1, MPI_FLOAT, i, 1, MPI_Comm_WORLD, &status);
            pi += local;
        }
        printf("Pi is %f", pi);
        MPI_Finalize();
    }
}