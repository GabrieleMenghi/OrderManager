using Microsoft.EntityFrameworkCore;
using OrderManager.DB;
using OrderManager.Repo;
using OrderManager.Repo.Int;
using OrderManager.Services;
using OrderManager.Services.Int;

namespace OrderManager;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<OrderManagerDBContext>(
            options => options.UseSqlServer("name=ConnectionStrings:OrderManagerDB"));

        // Add services to the container.
        builder.Services.AddScoped<IRepositoryProdotti, SqlRepositoryProdotti>();
        builder.Services.AddScoped<IProdottiService, ProdottiService>();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<OrderManagerDBContext>();
            dbContext.Database.Migrate();
            app.UseSwagger();
            app.UseSwaggerUI();


        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
