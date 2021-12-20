using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Identity.Models;
using DevToClone.Backend.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Text;

namespace DevToClone.Backend.Identity
{
    public static class IdentityServicesRegistration
    {
        public static void AddIdentityServices(
            this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<JwtSettings>(configuration.GetSection(
                nameof(JwtSettings)));

            services.AddDbContext<DevToCloneIdentityDbContext>(opt =>
                opt.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<DevToCloneIdentityDbContext>();

            services.AddTransient<IAuthenticationService, AuthenticationService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(opt =>
                {
                    opt.RequireHttpsMetadata = false;
                    opt.SaveToken = false;
                    opt.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["JwtSettings:Issuer"],
                        ValidAudience = configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]))
                    };

                    opt.Events = new JwtBearerEvents()
                    {
                        OnAuthenticationFailed = c =>
                        {
                            c.NoResult();
                            c.Response.StatusCode = 500;
                            c.Response.ContentType = "text/plain";
                            return c.Response.WriteAsync(c.Exception.ToString());
                        },

                        OnChallenge = c =>
                        {
                            c.HandleResponse();
                            c.Response.StatusCode = 401;
                            c.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject("401 Not authorized");
                            return c.Response.WriteAsync(result);
                        },

                        OnForbidden = c =>
                        {
                            c.Response.StatusCode = 401;
                            c.Response.ContentType = "application/json";
                            var result = JsonConvert.SerializeObject("403 Not authorized");
                            return c.Response.WriteAsync(result);
                        }
                    };
                });
        }
    }
}