using Microsoft.EntityFrameworkCore;
using OrderManager.DB;
using OrderManager.Repo;
using OrderManager.Repo.Int;
using OrderManager.Services;
using OrderManager.Services.Int;
using System.Text.Json;

namespace OrderManager;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<OrderManagerDBContext>(
            options => options.UseSqlServer("name=ConnectionStrings:OrderManagerDB"));

        builder.Services
        .AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        });

        /*builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: "*",
                policy =>
                {
                    policy.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
        });*/

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowOrigin", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            });
        });

        // Add services to the container.
        builder.Services.AddScoped<IRepositoryProdotti, SqlRepositoryProdotti>();
        builder.Services.AddScoped<IProdottiService, ProdottiService>();
        builder.Services.AddScoped<IProdottiParserService, ProdottiParserService>();
        builder.Services.AddScoped<IRepositoryClienti, SqlRepositoryClienti>();
        builder.Services.AddScoped<IClientiService, ClientiService>();

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
        app.UseRouting();
        app.UseCors("AllowOrigin");

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
