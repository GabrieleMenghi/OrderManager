﻿//// <auto-generated />
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Infrastructure;
//using Microsoft.EntityFrameworkCore.Metadata;
//using Microsoft.EntityFrameworkCore.Migrations;
//using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
//using OrderManager.DB;

//#nullable disable

//namespace OrderManager.Migrations
//{
//    [DbContext(typeof(OrderManagerDBContext))]
//    [Migration("20240318214933_CreateProdottoModel")]
//    partial class CreateProdottoModel
//    {
//        /// <inheritdoc />
//        protected override void BuildTargetModel(ModelBuilder modelBuilder)
//        {
//#pragma warning disable 612, 618
//            modelBuilder
//                .HasAnnotation("ProductVersion", "8.0.3")
//                .HasAnnotation("Relational:MaxIdentifierLength", 128);

//            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

//            modelBuilder.Entity("OrderManager.DB.Prodotto", b =>
//                {
//                    b.Property<long>("ProdottoId")
//                        .ValueGeneratedOnAdd()
//                        .HasColumnType("bigint");

//                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("ProdottoId"));

//                    b.Property<string>("Codice")
//                        .IsRequired()
//                        .HasColumnType("nvarchar(max)");

//                    b.Property<string>("Descrizione")
//                        .IsRequired()
//                        .HasColumnType("nvarchar(max)");

//                    b.Property<decimal>("Prezzo")
//                        .HasColumnType("decimal(18,2)");

//                    b.HasKey("ProdottoId");

//                    b.ToTable("Prodotti");
//                });
//#pragma warning restore 612, 618
//        }
//    }
//}
