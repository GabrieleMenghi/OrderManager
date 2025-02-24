//using Microsoft.EntityFrameworkCore.Migrations;

//#nullable disable

//namespace OrderManager.Migrations
//{
//    /// <inheritdoc />
//    public partial class AddClientiTable : Migration
//    {
//        /// <inheritdoc />
//        protected override void Up(MigrationBuilder migrationBuilder)
//        {
//            migrationBuilder.CreateTable(
//                name: "Clienti",
//                columns: table => new
//                {
//                    ClienteId = table.Column<long>(type: "bigint", nullable: false)
//                        .Annotation("SqlServer:Identity", "1, 1"),
//                    CodiceCliente = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Indirizzo = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                    Telefono = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    PartitaIva = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                    CodiceFiscale = table.Column<string>(type: "nvarchar(max)", nullable: true)
//                },
//                constraints: table =>
//                {
//                    table.PrimaryKey("PK_Clienti", x => x.ClienteId);
//                });
//        }

//        /// <inheritdoc />
//        protected override void Down(MigrationBuilder migrationBuilder)
//        {
//            migrationBuilder.DropTable(
//                name: "Clienti");
//        }
//    }
//}
